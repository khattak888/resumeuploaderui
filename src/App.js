import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Select,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Stack,
  styled,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Radio } from "@mui/material";
import { useState } from "react";
import { Button } from "@mui/material";

//style for upload button
const Input = styled('input')`

display:none
`


function App() {
  //states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState(null);
  const [st, setSt] = useState("");
  const [pjl , setPjl] = useState([])
  const [pimage , setPimage] = useState('')
  const [rdoc , setRdoc] = useState('')
  const [error , setError] = useState({
    status:false,
    msg:"",
    type:""

  })


  //MultiCheckBox
const getPjl  = (e)=>{
 let data = pjl
 data.push(e.target.value)
 setPjl(data)
}
//CleaR fOrm
const resetForm = ()=>{
   setName('')
   setEmail('')
   setDob(null)
   setSt('')
   setGender('')
   setPjl([])
   setPimage('')
   setRdoc('')
   document.getElementById('resume-form').reset()
}





//Handle form Submission
const handleSubmit = (e)=>{
  e.preventDefault();
  const data = new FormData()
 data.append('name', name)
 data.append('email' ,email)
 data.append('dob', dob)
 data.append('st', st)
 data.append('gender', gender)
 data.append('pjl', pjl)
 data.append('pimage', pimage)
 data.append('rdoc', rdoc)
 if(name && email){
  setError({status: true , msg:"Resume Upload Successfully" , type:'success'})
  resetForm()
  
 }else{
   setError({status: true , msg:"All Fields are Required" , type:'error'})
 }
}


  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: "#ef5350", padding: 2 }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{ fontWeight: "bold", color: "black" }}
        >
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={st}
                label="state"
                onChange={(e) => {
                  setSt(e.target.value);
                }}
              >
                <MenuItem value="Jh">Jharkand</MenuItem>
                <MenuItem value="Bh">Bihar</MenuItem>
                <MenuItem value="WP">West-Punjab</MenuItem>
                <MenuItem value="Wt">Waziristan</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender">
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={(e)=>setGender(e.target.value)}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={(e)=>setGender(e.target.value)}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  onChange={(e)=>setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <FormControl component='fieldset' fullWidth margin='normal'>
            <FormLabel id="legend">Preferred Job Location:</FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="Islamabad" value="Islamabad" onChange={(e)=>getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Karachi" value="Karachi" onChange={(e)=>getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Lahore" value="Lahore" onChange={(e)=>getPjl(e)}/>
              <FormControlLabel control={<Checkbox />} label="Faisalabad" value="Faisalabad" onChange={(e)=>getPjl(e)}/>
            </FormGroup>
            </FormControl>
            <Stack direction="row" alignItems="center" spacing={4}>
              <label htmlFor="profile-photo">
                <Input accept="image/*" id="profile-photo" type="file" onChange={(e)=>setPimage(e.target.files[0])} />
                <Button variant="contained" component="span">Upload Profile</Button>

              </label>
              <label htmlFor="resume-file">
                <Input accept="doc/*" id="resume-file" type="file"  onChange={(e)=>setRdoc(e.target.files[0])} />
                <Button variant="contained" component="span">Upload File</Button>

              </label>
            </Stack>
            <Button type="submit" variant='contained' sx={{mt:3, mb:2, px:5}} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>:''}
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: "#03a9f4", padding: 2 }}
          >
            <Typography
              variant="h3"
              component="div"
              sx={{ fontWeight: "bold", color: "black" }}
            >
              List of Condidates
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">Bilal</TableCell>
                  <TableCell align="center">bilal@gmail.com</TableCell>
                  <TableCell align="center">21/03/1998</TableCell>
                  <TableCell align="center">Pak</TableCell>
                  <TableCell align="center">Male</TableCell>
                  <TableCell align="center">Islamabad</TableCell>
                  <TableCell align="center">
                    <Avatar src="#" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
