import "./Class.css";
import React, {useState, useEffect} from 'react';


function ClassGraphQL(props)
{
    const [classInfo, setClassInfo] = useState({});

    const url = "https://api.peterportal.org/graphql"

    useEffect( () => {
        const fetchData = async () => {
            const query = `
                query {
                    course(id:"${props.name}"){
                        title
                        department_name
                        description
                    }
                }
            `


            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({query}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log("GRAPHQL ",data);
            setClassInfo(data.data.course);
        }
        fetchData();
    }, [props.name ]);

    let info;
    if (classInfo)
    {
        info = <div className="information">
        <p className="title">{classInfo.title}</p>
        <p className="department">{classInfo.department_name}</p>
        <p className="description">{classInfo.description}</p>
    </div>
    }
    else if (classInfo == null)
    {
        info = <p>Class Not Found</p>
    }
    else
    {
        info = <p>Loading....</p>
    }

    return(
        <div className="classGraphQL">
            {props.name}
            <div>
                {info}
            </div>
        </div>
    )
}


export default ClassGraphQL;