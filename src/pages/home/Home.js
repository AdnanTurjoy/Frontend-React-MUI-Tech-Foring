import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // http://localhost:5000/api/job/
    axios
      .get("https://backend-tech-foring-production.up.railway.app/api/job/")
      .then((res) => {
        setJobs(res.data);
      });
  }, [jobs]);
  //console.log(jobs[0].category);
  const handleCategory = (cat) => {
    setCategories(
      jobs.filter((job) => {
        return job.category === cat;
      })
    );
  };

  const handleDelete = (id) => {
    //http://localhost:5000/api/job/delete/${id}
    axios
      .delete(
        `https://backend-tech-foring-production.up.railway.app/api/job/delete/${id}`
      )
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.response.data.error);

        setError(false);
        setErrorMsg("");
      });
  };

  return (
    <div>
      <h1>BROWSE OPEN POSITIONS BY CATEGORY</h1>
      <p>We are always on the lookout for talanted people</p>

      <>
        {jobs &&
          jobs.map((job) => {
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => handleCategory(job.category)}
                >
                  <Typography variant="h6">{job.category}</Typography>
                </AccordionSummary>
                {categories &&
                  categories.map((categoryWize) => {
                    return (
                      <AccordionDetails>
                        <Link
                          to={`/singlejob/${categoryWize._id}`}
                          state={{ categoryWize }}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography variant="h6" color="" paragraph>
                            {categoryWize.name}
                          </Typography>
                        </Link>
                        <Link
                          to={`/singlejob/${categoryWize._id}`}
                          state={{ categoryWize }}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            color="success"
                            variant="contained"
                            size="small"
                            //onClick={() => handleEdit(categoryWize._id)}
                          >
                            Show Job
                          </Button>
                        </Link>{" "}
                        <Link
                          to={`/editjob/${categoryWize._id}`}
                          state={{ categoryWize }}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            //onClick={() => handleEdit(categoryWize._id)}
                          >
                            Edit
                          </Button>
                        </Link>
                        {"  "}
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleDelete(categoryWize._id);
                          }}
                        >
                          Delete
                        </Button>
                      </AccordionDetails>
                    );
                  })}
              </Accordion>
            );
          })}
      </>
    </div>
  );
}
