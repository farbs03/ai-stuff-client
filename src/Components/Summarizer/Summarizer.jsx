import React, {useState} from "react"
import { Typography, TextField, Button, Container, Box, CircularProgress, Grow } from "@material-ui/core"
import axios from 'axios'
import deepai from 'deepai'

const Summarizer = () => {
    const[link, setLink] = useState("")
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState()
    const getSummary = () => {
        setResult(null)
        setLoading(true);
        axios.post('http://127.0.0.1:5000/summarize', {
            articleUrl: link
        })
        .then(res => {
            setTimeout(() => setLoading(false), 200)
            setResult(res.result);
        })
      }
    return (
        <div style={{padding: "16px"}}>
            <h1>Summarizer</h1>
            <div style={{width: "500px", marginLeft: "50px"}}>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Enter a link here!"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setLink(e.target.value)}
                />
                <br></br>
                <Button variant="contained" color="primary" style={{textTransform: "none", color: "white", margin: "10px 0px", borderRadius: "5px"}} onClick={getSummary}>Submit</Button>
                <br></br>
            </div>
            <div style={{marginLeft: "auto", marginRight: "auto", width: "80%"}}>
                {!loading ? null : <CircularProgress variant="indeterminate" color="primary" style={{margin: "20px auto"}} />}
                {!result ? null :
                    (
                        <>
                            <h3 style={{textAlign: "center"}}>Summary</h3>
                            <Grow 
                                in 
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={1000}
                            >
                                <Box style={{width: "80%", borderTop:"1px solid #ccc", borderBottom:"1px solid #ccc", padding: "10px", margin: "10px auto"}}>
                                    <Typography>{result}</Typography>
                                </Box>
                            </Grow>
                        </>
                    ) 
                }
            </div>
        </div>
    )
}
export default Summarizer;