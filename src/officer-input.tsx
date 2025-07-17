import React, {useEffect, useState} from "react";
import useFetch from "./axios-utilities/fetch-data";


export function GetOfficers() {
    const [givenName, setGivenName] = useState();
    const {data, loading, error} = useFetch('http://localhost:8080/case/get-officers');

    useEffect(() => {
        if (data && data[0]['given_name']) {
            setGivenName(data[0]['given_name']);
        } else if (error) {
            console.log(error)
        }
    }, [givenName, data, error]);


    return (
    <>
        { loading && <div>Loading...</div> }
    {
        data !== null && <div>
            <input type={"text"} autoComplete={"cc-given-name"} name={'given_name'} defaultValue={givenName}/></div>
    }
    </>
    )
 }
