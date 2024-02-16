'use client'
import { Checkbox, TextField, Typography, Button, IconButton, Switch, Accordion } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ChangeEvent, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, SetStateAction, useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { CssVarsProvider } from '@mui/material-next/styles';
import MD3Button from '@mui/material-next/Button';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { getReportData } from "../../../../common/api/cohelm";
import { grey } from "@mui/material/colors";
import React from "react";


interface IReportForm { }


export default function ReportForm({ }: IReportForm) {
    const [darkMode, setDarkMode] = useState(false);
    const [statusColor, setStatusColor] = useState(false);
    const [caseId, setCaseId] = useState("");
    const [report, setReport] = useState<any>(undefined);
    const [displayText, setDisplayText] = useState(false);
    const [isLoading, setLoading] = useState(true)
    const [selected, setSelected] = useState("");
    
    
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
    

    
    useEffect(() => {
            getReportData()
            .then((report) => {
              setReport(report)
              setLoading(false)
            })
      }, [])

      if (isLoading) return <CircularProgress />
      if (!report) return <p>No report data</p>
    
    // let report: any;
    // try {
    //     report = await ;
    //     console.log("Report data:", report);
    // } catch (error) {
    //     console.error("Error fetching report data:", error);
    // }

    let status: string | undefined = "";

    if (report) {
      status = report.is_met ? "primary" : "error";
      
    }

    const handleCaseCopy = () => {
      // setCaseId(caseId1);
      setDisplayText(true);
      setTimeout(() => {
        setDisplayText(false);
      }, 10000); 
      // console.log(caseId1);
    };

    const handlePageNumber = (pageNumber: any) => {
      const url = "https://file.notion.so/f/f/372cc316-8aa0-41e7-980a-0d43ccecc1f4/f3b1909a-6eaa-4cc8-bb5b-8e3847609a26/medical-record.pdf?id=27fed38d-7826-4241-8ea8-bf9644e22110&table=block&spaceId=372cc316-8aa0-41e7-980a-0d43ccecc1f4&expirationTimestamp=1708156800000&signature=0MXtvW85KNzEQc0EJBi-glYj6twNueQvLHmKqGU6SKk&downloadName=medical-record.pdf#page=" + pageNumber.toString();
      window.open(url, '_blank');
    };
  

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

        <CssBaseline />
        <div>
            {/* <LightModeIcon/> */}
            <Switch {...label} onChange={toggleDarkMode}/>
            <DarkModeIcon />
        </div>
        
        <>
        {report &&
        <div className="welcome mt-8 mx-12">
              <div className="flex flex-row">
                    <Typography
                        variant="h5"
                        color={"#FFA500"}
                        sx={{ fontFamily: 'Monospace' }}
                    >
                        {report.procedure_name}
                    </Typography>

                    <CssVarsProvider>
                      <MD3Button disabled={false} variant="text" sx = {{ color: status, fontSize: 12 , fontStyle: "bold"}}  size="medium">
                        {report.is_met ? "Successful" : "Denied"}
                        {report.is_met ? <CheckIcon fontSize="inherit"/> : <DoDisturbIcon fontSize="inherit" /> } 
                      </MD3Button>
                    </CssVarsProvider>

                
                </div>

                <div className="flex flex-row mx-2">
                <CssVarsProvider>
                      <Button disabled={false} sx = {{ color: "gray", fontSize: 12 , fontStyle: "bold"}}  size="small" onClick={handleCaseCopy}>
                        {report.case_id}
                      </Button>
                      {displayText && <p>Copied<CheckIcon color="success"/></p>}
                </CssVarsProvider>

                </div>

                <div className="flex flex-row mx-2 mt-4">
                
                <div>
                  <Typography variant="body2" color="textSecondary">
                  Status
                  </Typography>
                  </div>

                  <div className="ml-32" >
                  <Typography variant="body2" color="textSecondary">
                  Progress
                  </Typography>
                  </div>

                  <div className="ml-32" >
                  <Typography variant="body2" color="textSecondary">
                  CPT Codes
                  </Typography>
                  </div>

                </div>

                <div className="flex flex-row mx-2">
                 <p className="mr-20">{report.is_complete ? "Complete" : "Incomplete"}</p>

                 {report.steps && report.steps.map((step:any, index:any) => ( 
                 <div className="ml-4" key={index}>
                  {step.is_met ? <CheckIcon>{"->"}</CheckIcon>: <DoDisturbIcon>{"->"}</DoDisturbIcon>} 
                  </div>
                  ))}


                &nbsp;&nbsp;
                
                {report.cpt_codes && report.cpt_codes.map((cptCode:any, index:any) => (
                  <div className="ml-4" key={index}>
                    <CssVarsProvider>
                          <Button disabled={false} sx = {{ color: "gray", fontSize: 12 , fontStyle: "bold"}}  size="small">
                            {cptCode}
                          </Button>
                          {/* {cptText && <p>Copied<CheckIcon color="success"/></p>} */}
                    </CssVarsProvider>
                  </div>
                ))}

                </div>
                
                
                <div className="flex flex-row mx-2 mt-4">
                <Typography variant="body2" color="textSecondary">
                  Summary
                  </Typography>

                </div>

                <div className="flex flex-row mx-2">
                <Typography variant="body2" color="textPrimary">
                  {report.summary}
                  </Typography>
                </div>

                <div className="flex flex-col mx-2 mt-4">
                {report.steps && report.steps.map((step:any, index:any) => (
                // <div className="flex flex">

                
                <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{ backgroundColor: step.is_met ? "#088F8F" : "#D22B2B" }} 
                    >
                      Instructions
                    </AccordionSummary>
                    <AccordionDetails>
                    {step.question}

                    <Typography variant="body2" sx={{ color: step.is_met ? "#088F8F" : "#D22B2B" }}>
                        Selected Options
                      </Typography>

                    {step.options && step.options.map((option:any, index:any) => (
                      <>
                      {option.selected && 
                       <Typography variant="body2" sx={{ color: step.is_met ? "#088F8F" : "#D22B2B" }}>
                       <CheckIcon /> {option.key} {option.text}
                      </Typography>}
                      </>
                    ))}
                      
                          <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ backgroundColor: step.is_met ? "#088F8F" : "#D22B2B" }} 
                              >
                                Show all Options
                              </AccordionSummary>
                              <AccordionDetails >
        
                              {step.options && step.options.map((option:any, index:any) => (
                              <>
                              <div className="flex flex-col">
                              <FormControlLabel control={<Checkbox checked={option.selected} />} label={option.text} />
                              </div>
                              </>
                              ))}
                             
                                  
                                
                              </AccordionDetails>
                        </Accordion>
                        

                        <div></div>
                        <br/><br/>
                        {step.is_met ?
                        <div className="font-bold"> 
                        Option/Section &nbsp;
                        {step.options && step.options
                                          .filter((option: any) => option.selected)
                                          .map((option: any, index: any) => (
                                      <>
                                              
                                               {option.key} {index < step.options.length - 1 && ', '}
                                      </>
                                        ))} 

                        
                         
                        has been selected because...
                        </div>
                        : <div className="font-bold">So this hasn't met our requirement as explained below: </div>}
                       
                    {step.reasoning && step.reasoning.split("\n").map((sent:any , index:any) => (
                      <div className="mt-2">
                      {sent}
                      </div>

                    ))}
                    
                    <div className="mt-4">
                    <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                                sx={{ backgroundColor: "#d3d3d3" }} 
                              >
                                <LightbulbOutlinedIcon />
                               The decision was made based on citations from the medical record
                              </AccordionSummary>
                              <AccordionDetails >
        
                                    <Accordion>
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            
                                          >
                                            Show Evidence
                                          </AccordionSummary>
                                          <AccordionDetails >

                                          <div className="flex flex-row ml-12">
                                          <Typography variant="body2" color="gray">
                                               Page Number
                                            </Typography>
                                            &nbsp; &nbsp; &nbsp;
                                            <Typography variant="body2" color="gray">
                                               Content
                                            </Typography>
                                          </div>
                    
                                          {step.evidence && step.evidence.map((evidence:any, index:any) => (
                                            <>
                                            
                                            <div className="flex flex-row ml-12">
                                                <div key={index} className="flex flex-row items-center justify-between">
                                                <CssVarsProvider>
                                                    <Button disabled={false} sx = {{ color: "gray", fontSize: 12 , fontStyle: "bold"}}  size="small" onClick={() => handlePageNumber(evidence.page_number)}>
                                                      Page {evidence.page_number}
                                                    
                                                    </Button>
                                              </CssVarsProvider>
                                              </div>                                            
                                              &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                                                <div key={index} className="flex flex-row items-center justify-between">
                                                <Typography variant="body2" color="black">
                                                  {evidence.content}
                                                </Typography>
                                                </div>
                                                </div>
                                            <div className="border-t border-gray-400 mt-4 ml-12 mr-12" color="gray"></div>
                                            </>
                                          ))}
                                        
                                              
                                            
                                          </AccordionDetails>
                                    </Accordion>
                                    
                                   
                                    <div className="font-bold"> 
                                   
                                    {step.logic && step.logic.length > 1 && step.logic
                                                      .filter((logic: any) => logic.selected)
                                                      .map((logic: any, index: any) => (
                                                  <>
                                                          
                                                          {logic.text.split(", ").map((sublogic:any, subIndex:any) =>
                                                                <React.Fragment key={index * 1000 + subIndex}>
                                                                  {subIndex % 2 == 0 ? (
                                                                    
                                                                    <>
                                                                      <div key={subIndex} >{sublogic},</div>
                                                                    </>
                                                                  ) : (
                                                                  <>
                                                                    <div className="underline" key={subIndex}>
                                                                      {sublogic}. 
                                                                      
                                                                    </div>
                                                                  </>
                                                                  )}
                                                                  </React.Fragment>

                                                          )} 
                                                  </>
                                                    ))} 
                                    
                                    
                                    </div>
                                    
                                    {step.logic && step.logic.length > 1 &&               
                                    <Accordion>
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1-content"
                                          id="panel1-header"
                                        >
                                          Why?
                                        </AccordionSummary>
                                        <AccordionDetails >
                  
                                        {step.logic && step.logic
                                                      .map((logic: any, index: any) => (
                                        <>
                                            <div className="flex flex-col">
                                            <FormControlLabel control={<Checkbox checked={logic.selected} />} label={logic.text} />
                                            </div>
                                        </>
                                        ))}
                                      
                                            
                                          
                                        </AccordionDetails>
                                  </Accordion>
                                    }
                                
                              </AccordionDetails>
                      </Accordion>

                  </div>
                      
                      
                    </AccordionDetails>
              </Accordion>
              //  </div>
                ))}
              </div>

        </div> 
        }

        </>

        
    </ThemeProvider>
    )
}
