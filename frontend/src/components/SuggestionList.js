import React, {useEffect, useState} from 'react';
import {Card} from "antd";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks";
import {useAppContext} from "store.js";
import './SuggestionList.scss'

export default function SuggestionList ({ style }) {
    const {
        store: { jwtToken }
    } = useAppContext();

    const headers = { Authorization: `JWT ${jwtToken}`};

    const [{ data: userList, loading, error }, refetch] = useAxios({
        url: "http://localhost:8000/accounts/suggestions/",
        headers
    });

    return (
        <div style={style}>
            {/*{loading && <div>...loading</div>}*/}
            {/*{error && <div>an error occur by loading</div>}*/}

            {/*<button onClick={() => refetch()}>Reload</button>*/}

            <Card title="Suggestions for you" size="small">
                { userList &&
                userList.map(suggestionUser => (
                    <Suggestion
                        key ={suggestionUser.username}
                        suggestionUser={suggestionUser}
                    />
                    ))
                }
            </Card>
        </div>
    );
};