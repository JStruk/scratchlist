import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import client from "../api/client";
import { useEffect } from "react";
import { ListItem } from '../interfaces/Todo';

export const useFetchOrCreateList = (setListId: (id: string) => void, setTitle: (title: string) => void, setTodos: (todos: Array<ListItem>) => void, todos: Array<ListItem>): void => {
    const navigate = useNavigate()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();

    return useEffect(() => {
        const listIdFromParams = query.get('listId')
        const fetchListFromApi = async (listId: string | null) => {
            let list;
            listId
                ? list = await fetchList(listId) || await createListWithId(listId, navigate)
                : list = await createList(navigate)

            setListId(list.id)
            if (list.title) {
                setTitle(list.title)
            }
            if (list.listItems) {
                setTodos(list.listItems.sort((a: ListItem, b: ListItem) => a.id > b.id))
            }
        }

        fetchListFromApi(listIdFromParams)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

const fetchList = async (listId: string) => {
    try {
        return (await client.get(`/list?listId=${listId}`)).data
    } catch (e) {
        console.log('getting list failed', e);
    }
}

const createListWithId = async (listId: string, navigate: NavigateFunction) => {
    const newListPayload = {
        id: listId,
        listItems: []
    }
    const list = (await client.post('/list', newListPayload)).data
    navigate(`?listId=${listId}`)
    return list
}

const createList = async (navigate: NavigateFunction) => {
    const newList = (await client.post('/list')).data
    navigate(`?listId=${newList.id}`)
    return newList
}