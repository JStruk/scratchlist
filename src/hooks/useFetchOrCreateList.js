import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const useFetchOrCreateList = (setListId, setTodos, todos) => {
    const history = useHistory()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    return useEffect(() => {
        const listIdFromParams = query.get('listId')
        const fetchListFromApi = async (listId) => {
            let list;
            if (listId) {
                console.log('hi');
                list = await fetchList(listIdFromParams, setListId, setTodos) || await createListWithId(listIdFromParams, setListId, setTodos, history)
                setListId(listId)

                console.log(list);
                if (list.listItems) {
                    setTodos(list.listItems.sort((a, b) => a.id > b.id))
                }

                return
            }
            await createList(setListId, history)
        }

        fetchListFromApi(listIdFromParams)
    }, [])
}

const fetchList = async (listId, setListId, setTodos) => {
    try {
        return (await axios.get(`/list?listId=${ listId }`)).data
    } catch (e) {
        console.log('getting list failed', e);
    }
}

const createListWithId = async (listId, setListId, setTodos, history) => {
    setTodos([])
    const newListPayload = {
        id: listId,
        items: []
    }
    const list = (await axios.post('/list', newListPayload)).data
    history.push(`list?listId=${ listId }`)
    return list
}

const createList = async (setListId, history) => {
    const newListPayload = {
        items: []
    }
    const newListId = (await axios.post('/list', newListPayload)).data.id
    setListId(newListId);
    history.push(`list?listId=${ newListId }`)
}