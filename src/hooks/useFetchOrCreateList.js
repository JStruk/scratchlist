import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export const useFetchOrCreateList = (setListId, setTitle, setTodos, todos) => {
    const navigate = useNavigate()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    return useEffect(() => {
        const listIdFromParams = query.get('listId')
        const fetchListFromApi = async (listId) => {
            let list;
            listId
                ? list = await fetchList(listIdFromParams) || await createListWithId(listIdFromParams, navigate)
                : list = await createList(navigate)

            setListId(list.id)
            if (list.title) {
                setTitle(list.title)
            }
            if (list.listItems) {
                setTodos(list.listItems.sort((a, b) => a.id > b.id))
            }
        }

        fetchListFromApi(listIdFromParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

const fetchList = async (listId) => {
    try {
        return (await axios.get(`/list?listId=${listId}`)).data
    } catch (e) {
        console.log('getting list failed', e);
    }
}

const createListWithId = async (listId, navigate) => {
    const newListPayload = {
        id: listId,
        listItems: []
    }
    const list = (await axios.post('/list', newListPayload)).data
    navigate(`?listId=${listId}`)
    return list
}

const createList = async (navigate) => {
    const newList = (await axios.post('/list')).data
    navigate(`?listId=${newList.id}`)
    return newList
}