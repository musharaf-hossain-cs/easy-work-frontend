BACKEND_URL = "http://localhost:8000";

function fetchBackendJSON(url, method, data_dict)
{
    const backend_url = `${BACKEND_URL}/${url}/`;
    fetch(backend_url, {
        method: method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data_dict)
    })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            // if (data.success === true) {
            //     return data;
            // }

            return data;
            
        });
}




