import { useRef, useState } from "react"

let nextid = 0;

export default function Steps () {
    const [formd, setForm] = useState({
        dt:'',
        km:'',
    });

    const [isDecimalValid, setIsDecimalValid] = useState(false);  
    const isCheckDate = useRef(false); 

    const handleNameChange = (event) => {
        const {target} = event;
        const {name, value} = target;
        if (name === "km"){            
            const isValid = /^\-?\d+(\.\d+)?$/.test(value);
            if (isValid) {
                setIsDecimalValid(true);
                } else {
                setIsDecimalValid(false);  
                }
        }        
        setForm(prevForm => ({...prevForm, [name]:value}));
    }

    const [datakm, setDatakm] = useState([]);

    const handleDelete = (index) => {
        setDatakm(prevData => prevData.filter((data)=>data.id != index));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isDecimalValid){
            if (datakm.length > 0){
                datakm.map((item)=>{
                    if (item.dt === formd.dt) {
                        item.km = parseFloat(item.km) + parseFloat(formd.km);
                        isCheckDate.current = true;
                    }
                });
                if (isCheckDate.current) {
                    isCheckDate.current = false;
                    setDatakm([...datakm]);                    
                }
                else {
                    setDatakm([...datakm,{id:nextid++, dt: formd.dt, km: formd.km}]);
                }
            }
            else {                
                setDatakm([...datakm,{id:nextid++, dt: formd.dt, km: formd.km}]);
            }
        }
        else {
            alert("Неверно введено число!");
        }
    }
    
    return(
        <div className="container">
        <form onSubmit={handleSubmit}>
            <div>
                <span className="dt">Дата (ДД.ММ.ГГ)</span>
                <span className="km">Пройдено км</span>
            </div>
            <input type="date" name="dt" value={formd.name} onChange={handleNameChange}/>
            <input type="text" name="km" value={formd.name} onChange={handleNameChange}/>
            <button className="buttonOk" type="submit" name="butAdd">OK</button>
            <table>
                <thead>
                    <tr>
                        <th>Дата (ДД.ММ.ГГ)</th>
                        <th>Пройдено км</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {datakm.sort((a,b) => new Date(...b.dt.split('/').reverse()) - new Date(...a.dt.split('/').reverse())).map((val) => {
                    return (
                        <tr key={val.id}>
                            <td className="tddt">{val.dt}</td>
                            <td className="tdkm">{val.km}</td>
                            <td className="tdact"><button className="material-icons">edit</button><button className="material-icons" onClick={() => handleDelete(val.id)}>close_small</button></td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
        </form>
        </div>
    )
}