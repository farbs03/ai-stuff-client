import React, { useCallback, useEffect, useRef, useState } from 'react';

import {IconButton} from "@material-ui/core"
import {motion} from "framer-motion"
import { Stage, Layer, Line, Text } from 'react-konva'

import ReplayIcon from '@material-ui/icons/Replay'
import ImportExportIcon from '@material-ui/icons/ImportExport';
import BrushIcon from '@material-ui/icons/Brush';
import BlockIcon from '@material-ui/icons/Block';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {blue} from '@material-ui/core/colors';

import axios from 'axios'

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const Canvas = ({ width, height }) => {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState([]);
    const isDrawing = useRef(false);
    const stageRef = useRef(null);
    const [count, setCount] = useState(1);
    const [value, setValue] = useState("")

    const handleExport = () => {
        const uri = stageRef.current.toDataURL();
        setCount(count + 1);
        var formatted = uri.split("base64,")[1]
        console.log(formatted)
        console.log(typeof(formatted))
        axios.post('https://incentiva-cloud-vision.herokuapp.com/', {
            imageString: formatted
        })
        .then(res => {
            setValue(res.data);
        })
    };    
    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    const handleToolChange = (event) => {
        setTool(event.target.value)
    }
    return (
        <div style={{textAlign: "center", width: "350px", height: "350px", margin: "10px auto"}}>

            <FormControl>
                <Select
                    value={tool}
                    onChange={(e) => {setTool(e.target.value)}}
                    label="Age"
                    style={{
                        lineHeight: "20px"
                    }}
                >
                    <MenuItem value="pen"><BrushIcon /></MenuItem>
                    <MenuItem value="eraser"><BlockIcon /></MenuItem>
                </Select>
            </FormControl>

            <motion.div
                whileTap={{
                    rotate: -180
                }}
                style={{width: "48px", height: "48px", borderRadius: "50%", display: "inline-block"}}
            >
                <IconButton onClick={() => {setLines([])}}><ReplayIcon /></IconButton>
            </motion.div>

            <motion.div
                style={{width: "48px", height: "48px", borderRadius: "50%", display: "inline-block"}}
            >
                <IconButton onClick={handleExport}><ImportExportIcon /></IconButton>
            </motion.div>

            <br></br>

            <div style={{width: "350px", height: "350px", border:"1px solid", cursor: "crosshair"}}>
                <Stage
                    width={350}
                    height={350}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                    ref={stageRef}
                >
                    <Layer style={{padding: "5px"}}>
                        {lines.map((line, i) => (
                            <Line
                                key={i}
                                points={line.points}
                                stroke={blue[400]}
                                strokeWidth={line.tool === 'eraser' ? 20 : 5}
                                tension={0.5}
                                lineCap="round"
                                globalCompositeOperation={
                                    line.tool === 'eraser' ? 'destination-out' : 'source-over'
                                }
                            />
                        ))}
                    </Layer>
                </Stage>
            </div>
            {value}
        </div>
    );
};

export default Canvas;