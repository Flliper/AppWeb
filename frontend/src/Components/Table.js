import '../Styles/Table.css';
import flecheDroite from '../Assets/angle-droit.svg';
import flecheFinGauche from '../Assets/angle-double-gauche.svg';
import flecheFinDroite from '../Assets/angle-double-droit.svg';
import flecheGauche from '../Assets/angle-gauche.svg';
import triangleBas from '../Assets/triangle_bas.svg';
import triangleHaut from '../Assets/triangle_haut.svg';



function Table({tableNames, selectedTable, setSelectedTable, tableColumns,
                   infoTable, page, setPage, count, filters, setFilters, sort, setSort}) {

    let totalPages = Math.ceil(count / 10);

    function handleInputChange(event) {

        let inputValue = Number(event.target.value);

        // empêcher l'utilisateur de mettre 0
        if (inputValue >= 1) {
            setPage(Number(event.target.value));
            }

    // empêcher l'utilisateur de mettre un nombre supérieur au nombre de pages
        if (inputValue > totalPages) {
            setPage(totalPages);
        }
    }

    function nextPage() {
        if ( page < totalPages ) {
        setPage(page + 1);
        }
    }
    function previousPage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }
    function putDataAtBegin() {
        setPage(1);
    }
    function putDataAtEnd() {
        setPage(totalPages);
    }

    // Gestion du tri des colonnes
    // Gestion du tri des colonnes
const handleSort = (columnName) => {
    let newSort = { column: columnName, order: 'ASC' };

    if (sort.column === columnName) {
        switch(sort.order) {
            case 'ASC':
                newSort.order = 'DESC';
                break;
            case 'DESC':
                newSort = { column: null, order: null };
                break;
            default:
                break;
        }
    }

    setSort(newSort);
}



    return (
        <div>
            <div className="div-select-table">
            <select className="select-table" value={selectedTable} onChange={e =>  { setPage(1); setFilters({}) ; setSelectedTable(e.target.value)}}>
                <option value="">Sélectionner une table</option>
                {tableNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
            </select>
            </div>
            <div className="table-container">
            <table>
                <thead>
                    <tr>
                      {tableColumns.map((columnName, index) => (
                        <th key={index} onClick={() => handleSort(columnName)}>
                          <div className="column-content">
                              <div className="titleColumn">
                                {columnName}
                                {
                                  sort.column === columnName
                                    ? sort.order === 'ASC'
                                      ? <img className="triangle-bas" src={triangleBas} alt="triangleBas" />
                                      : <img className="triangle-bas" src={triangleHaut} alt="triangleHaut" />
                                    : null
                                }
                                </div>
                                <input
                                  onClick={(e) => e.stopPropagation()}
                                  placeholder="Filtre"
                                  value={filters[columnName] || ''}
                                  onChange={e => { setFilters({...filters, [columnName]: e.target.value}); setPage(1);}}
                                />
                          </div>
                        </th>
                      ))}
                    </tr>
                </thead>
                <tbody>
                    {infoTable.map((row, index) => (
                        <tr key={index}>
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                </tbody>

            </table>
            </div>

            {selectedTable && totalPages !== 1 ?
              <div className="navigation">
                <img className={`fleche-gauche ${page === 1 ? 'disabled' : ''}`}  src={flecheFinGauche} alt="flecheFinGauche" onClick={() => putDataAtBegin()} />
                <img className={`fleche-gauche ${page === 1 ? 'disabled' : ''}`}  src={flecheGauche} alt="flecheGauche" onClick={() => previousPage()} />
                <input className="input-page" type="number" value={page} min={1} onChange={handleInputChange} />
                <img className={`fleche-droite ${page === totalPages ? 'disabled' : ''}`} src={flecheDroite} alt="flecheDroite" onClick={() => nextPage()} />
                <img className={`fleche-droite ${page === totalPages ? 'disabled' : ''}`} src={flecheFinDroite} alt="flecheFinDroite" onClick={() => putDataAtEnd()} />
              </div>
            : null}


        </div>
    );
}

export default Table