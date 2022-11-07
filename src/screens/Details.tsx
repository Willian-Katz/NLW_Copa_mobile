import { useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';

interface RouteParams {
    id: string;
}

export function Details() {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    // Vou pegar o id dos parametros das rotas
    const route = useRoute();
    const { id } = route.params as RouteParams;

    async function fetchPoolDatails() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${id}`)
            console.log(response.data.pool);
            
            
        } catch (error) {
            console.log(error)

            toast.show({
                title: 'Não foi possível carregar os detalhes do bolão',
                placement: 'top',
                bgColor: 'red.500',
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPoolDatails();
    }, [id]);

    if(isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Título do bolão" showBackButton showShareButton/>
            
        </VStack>
    )
}