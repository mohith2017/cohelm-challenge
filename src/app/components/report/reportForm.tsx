'use client'
import { Checkbox, TextField, Typography, Button, IconButton, Switch } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from '@mui/icons-material/Delete';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { getReportData } from "../../../../common/api/cohelm";
// import Link from "next/link";


interface IReportForm { }


export default async function LoginForm({ }: IReportForm) {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(false);
    const [medicalFile, setMedicalFile] = useState<File | null>(null);
    const [guidelineFile, setGuidelineFile] = useState<File | null>(null);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    //Dark mode
    const lightTheme = createTheme({
        palette: {
          mode: 'light',
        },
      });
    
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    
        const toggleDarkMode = () => {
            setDarkMode(!darkMode);
            console.log(darkMode);
        };
    

    const handleMedicalFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setMedicalFile(e.target.files[0]);
          }
      };


    const handleGuidelineFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setGuidelineFile(e.target.files[0]);
        }
    };

    const handleMedicalFileDelete = () => {
        if (medicalFile) {
            setMedicalFile(null);
        }
    };

    const handleGuidelineFileDelete = () => {
        if (guidelineFile) {
            setGuidelineFile(null);
        }
    };

    const handleRedirect = () => {
        
        if (medicalFile && guidelineFile) {
            router.push('/report');
        }
        else if (medicalFile && !guidelineFile) {
            alert("Please upload Guideline PDF");
        }
        else if (!medicalFile && guidelineFile) {
            alert("Please upload Medical PDF");
        }
        else{
            alert("Please upload BOTH Medical and Guideline PDFs");
        }
    };  

    let report;
    try {
        report = await getReportData();
        console.log("Report data:", report);
    } catch (error) {
        console.error("Error fetching report data:", error);
    }

    

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <div>
            {/* <LightModeIcon/> */}
            <Switch {...label} onChange={toggleDarkMode}/>
            <DarkModeIcon />
        </div>

        <>
        Report Page
            {report? 
            <p>{report.case_id}</p>
            : <></>
            }

        </>

        <div className="login-form">
            
            <div className="inputs-form text-center">
                <div className="welcome">
                    <Typography
                        variant="h4"
                        color={"#FFA500"}
                    >
                        Welcome to Co:helm
                    </Typography>
                </div>

                <div className="flex flex-col items-center justify-center h-32">
                    <div className="mt-32">
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                            sx={{ marginRight: "1rem"}}
                        >
                            MEDICAL RECORD 
                            <input type="file" accept=".pdf" hidden onChange={handleMedicalFileUpload} />
                        </Button>

                        <div className="mt-4">
                        {medicalFile && (
                            <section>
                                {medicalFile.name}
                                <IconButton aria-label="delete" size="small" onClick={handleMedicalFileDelete}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </section>
                        )}
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                            sx={{ marginRight: "1rem" }}
                        >
                            GUIDELINES 
                            <input type="file" accept=".pdf" hidden onChange={handleGuidelineFileUpload} />
                        </Button>

                        <div className="mt-4">
                        {guidelineFile && (
                            <section>
                                {guidelineFile.name}
                                <IconButton aria-label="delete" size="small" onClick={handleGuidelineFileDelete}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </section>
                        )}
                        </div>
                    </div>
              
                
                    <div className="mt-12">
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<BookIcon />}
                            sx={{ marginRight: "1rem"}}
                            onClick={handleRedirect}
                        >
                            GENERATE
                            {/* <Link href={'/cohelm'}></Link> */}
                        </Button>

                    </div>
                </div>
           

               
            </div>

        </div> 
    </ThemeProvider>
    )
}
