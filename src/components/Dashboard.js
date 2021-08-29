import { useState, useEffect } from "react";
import { fetchLinks, getCount } from "../utils/networkHandler";

import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    fontFamily: "Cascadia Code",
    color: "white",
    borderBottom: "none",
  },
  tableCell: {
    fontFamily: "Cascadia Code",
    color: "white",
    borderBottom: "none",
  },
  hits: {
    fontWeight: "bold",
    backgroundColor: "green",
    fontSize: "0.75rem",
    borderRadius: "50%",
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const truncate = (str) => {
  return str.length > 30 ? str.substring(0, 30) + "..." : str;
};

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [count, setCount] = useState({
    thirtyDaysRecord: [],
    oneDayRecord: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetchLinks();
      setLinks(res);
      let date = await getCount();
      setCount(date);
      setLoading(false);
    };
    fetchData();
  }, []);

  const classes = useStyles();

  return (
    <section>
      <div className="form-container-dashboard">
        <TableContainer>
          <Table className={Dashboard.table}>
            {!loading && (
              <div>
                <h1>Dashboard</h1>
                <div className="stats">
                  <h4>URL shortened today - {count.oneDayRecord.length}</h4>
                  <h4>
                    URL shortened this month - {count.thirtyDaysRecord.length}
                  </h4>
                </div>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className={classes.tableHeaderCell}
                      align="center"
                    >
                      Shortified URL
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      align="center"
                    >
                      Entered URL
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      align="center"
                    >
                      Total Hits
                    </TableCell>
                    <TableCell
                      className={classes.tableHeaderCell}
                      align="center"
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {links.map((link) => {
                    return (
                      <TableRow key={link._id}>
                        <TableCell className={classes.tableCell}>
                          <a className="link-url" href={link.shortURL}>
                            {link.shortURL}
                          </a>
                        </TableCell>
                        <TableCell
                          className={classes.tableCell}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {truncate(link.longURL)}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          <Typography className={classes.hits}>
                            {link.hitCount}
                          </Typography>
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          {new Date(link.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </div>
            )}
            {loading && <h3>Loading....</h3>}
          </Table>
        </TableContainer>
      </div>
    </section>
  );
};

export default Dashboard;
