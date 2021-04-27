import React, {useState} from "react"
import { Typography, TextField, Button, Container, Box, CircularProgress, Grow } from "@material-ui/core"


const Summarizer = () => {
    const[link, setLink] = useState("")
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState()
    const getSummary = () => {
        setResult(null)
        const formData = link;
        setLoading(true)
        fetch('http://127.0.0.1:5000/summarize', 
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(formData)
          })
          .then(response => response.json())
          .then(response => {
            setTimeout(() => setLoading(false), 200)
            setResult(response.result)
            console.log(JSON.stringify(formData))
            console.log(response)
            console.log(JSON.parse(response.result))
          });
      }
    return (
        <div style={{padding: "16px"}}>
            <h1>Summarizer</h1>
            <div style={{marginLeft: "auto", marginRight: "auto", width: "80%"}}>
                <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    placeholder="Enter a link here!"
                    variant="outlined"
                    onChange={(e) => setLink(e.target.value)}
                />
                <Button variant="contained" color="primary" style={{textTransform: "none", color: "white", margin: "10px 0px", borderRadius: "5px"}} onClick={getSummary}>Submit</Button>
                <br></br>
                <br></br>
                {!loading ? null : <CircularProgress variant="indeterminate" color="primary" style={{margin: "20px auto"}} />}
                {!result ? null :
                    (
                        <>
                            <h3>Summary</h3>
                            <Grow 
                                in 
                                style={{ transformOrigin: '0 0 0' }}
                                timeout={1000}
                            >
                                <Box style={{width: "100%", borderTop:"1px solid #ccc", borderBottom:"1px solid #ccc", padding: "16px"}}>
                                    {result}
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