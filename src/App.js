import { useEffect, useState } from "react";
import axios from "axios";
import { base64encode } from "nodejs-base64";
import MediaCard from "./components/MediaCard";
import DirectionStack from "./components/DirectionStack";
import Stack from "@mui/material/Stack";
import { getCardActionsUtilityClass } from "@mui/material";

export const user = { name: "react", pass: "a11018836bd99951305b73dbeab" };
export const getAuth = {
    Authorization: `Basic ${base64encode(`${user.name}:${user.pass}`)}`,
    Accept: "application/json",
    "Content-Type": "application/json",
};

function App() {
    const [data, setData] = useState({
        places: [],
        routes: [],
        placeTypes: [],
        texts: [],
    });
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(
                "https://dashboard-trinidad.herokuapp.com/api/load/all",
                {
                    headers: getAuth,
                }
            );
            const receivedData = await result.data;
            setData(receivedData);
        }
        fetchData();
    }, []);

    //console.log(data);

    let cardList = <h3>Loading...</h3>;
    let cardsInRows = [];
    let rowsInStacks = [];
    if (data.places.length !== 0) {
        cardList = data.places.map((place) => {
            return (
                place.headerImages.length > 0 && (
                    <MediaCard
                        key={place.id}
                        image={place.headerImages[0].url}
                        alt={place.name}
                        text={place.description.slice(0, 200)}
                        title={place.name}
                    />
                )
            );
        });
        let row = <Stack direction="row" spacing={2} />;
        let ini = 0;
        let fin = 0;
        for (let i = 0; i < cardList.length; i++) {
            fin = i;
            if ((i + 1) % 3 === 0) {
                cardsInRows.push(
                    <Stack key={i + 1} direction={row} spacing={2}>
                        {cardList.slice(ini, fin)}
                    </Stack>
                );
                ini = fin;
            }
        }
        if (ini !== fin) {
            cardsInRows.push(
                <Stack key={ini + 1} direction={row} spacing={2}>
                    {cardList.slice(ini, fin)}
                </Stack>
            );
        }
    }
    return <DirectionStack spacing={5}>{cardList}</DirectionStack>;
}

export default App;
