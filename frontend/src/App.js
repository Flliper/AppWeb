import './Styles/App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import Table from "./Components/Table";
import {BrowserRouter as Router, Route, Link, Routes} from "react-router-dom";
import Accueil from './Components/Accueil';
import Test from './Components/Test';


function App() {

    const [tableNames, setTableNames] = useState([]);
    const [selectedTable, setSelectedTable] = useState("");
    const [infoTable, setInfoTable] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(100);
    const [nbLines, setNbLines] = useState(10);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState({column: null, order: null});


    //Récupère les noms des tables
    useEffect(() => {
        axios.get('http://localhost:8000/api/tables/')
            .then(response => {
                setTableNames(response.data);
            })
            .catch(error => {
                console.error('Error fetching field names', error);
            });
    }, []);

    //Récupère les données de la table sélectionnée
    useEffect(() => {
        if (selectedTable) {
            const filterString = encodeURIComponent(JSON.stringify(filters));
            let url = `http://localhost:8000/api/${selectedTable}?page=${page}&limit=${nbLines}&filter=${filterString}`;

            if (sort.column !== null) {
                const sortString = encodeURIComponent(JSON.stringify({[sort.column]: sort.order}));
                url += `&sort=${sortString}`;
            }

            axios.get(url)
                .then(response => {
                    setInfoTable(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data', error);
                });
        } else {
            setInfoTable([]);
        }
    }, [selectedTable, page, nbLines, filters, sort]);


    //Récupère les noms des colonnes de la table sélectionnée
    useEffect(() => {
        selectedTable ?
            axios.get(`http://localhost:8000/api/${selectedTable}/colonnes`)
                .then(response => {
                    setTableColumns(response.data);
                })
                .catch(error => {
                    console.error('Error fetching column names', error);
                })
            : setTableColumns([]);
    }, [selectedTable]);

    //Récupère le nombre de lignes de la table sélectionnée
    useEffect(() => {
        selectedTable ?
            (() => {
                const filterString = encodeURIComponent(JSON.stringify(filters));
                const url = `http://localhost:8000/api/${selectedTable}/count?filter=${filterString}`;
                axios.get(url)
                    .then(response => {
                        setCount(response.data.count);
                    })
                    .catch(error => {
                        console.error('Error fetching count', error);
                    });
            })()
            : setCount(0);
    }, [selectedTable, filters]);


    // return (
    //         <Router>
    //             <div>
    //                 <nav>
    //                     <ul>
    //                         <li>
    //                             <Link to="/table">Go to Table</Link>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //
    //                 <Route path="/" exact component={Accueil} />
    //                 <Route
    //                     path="/table"
    //                     render={(props) => (
    //                         <Table
    //                             {...props}
    //                             selectedTable={selectedTable}
    //                             setSelectedTable={setSelectedTable}
    //                             tableNames={tableNames}
    //                             tableColumns={tableColumns}
    //                             infoTable={infoTable}
    //                             page={page}
    //                             setPage={setPage}
    //                             count={count}
    //                             filters={filters}
    //                             setFilters={setFilters}
    //                             sort={sort}
    //                             setSort={setSort}
    //                         />
    //                     )}
    //                 />
    //             </div>
    //         </Router>
    // );


    // return (
    //   <div className="App">
    //       <Table selectedTable={selectedTable} setSelectedTable={setSelectedTable}
    //              tableNames={tableNames} tableColumns={tableColumns} infoTable={infoTable}
    //              page={page} setPage={setPage} count={count} filters={filters} setFilters={setFilters}
    //              sort={sort} setSort={setSort}
    //       />
    //   </div>
    // );

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Accueil/>}/>
            </Routes>
        </div>

    );






}

export default App;
