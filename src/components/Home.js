import React from 'react';
import { useNavigate } from "react-router-dom";
import TypeWriterEffect from 'react-typewriter-effect';
import tw from "tailwind-styled-components";

const ListTypes = [
    'ToDo List',
    'Grocery List',
    'Best-of List',
    'Inventory List',
    'Brainstorming List',
    'Ranking List',
    'CheckList'
];

export default function Home() {
    const navigate = useNavigate();

    const createNewList = () => {
        navigate('/list')
    }

    const HomeContainer = tw.div`min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12`
    const Content = tw.div`relative py-3 sm:max-w-xl sm:mx-auto`
    const GradientBackgroundCard = tw.div`absolute inset-0 bg-gradient-to-r from-teal-300 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl`
    const MainCard = tw.div`relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20`
    const MainCardContent = tw.div`max-w-md mx-auto`
    const Header = tw.span`text-center text-5xl text-teal-400`
    const TypeWriterContainer = tw.div`py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7`
    const ActionButtonContainer = tw.div`pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7`
    const GetStartedButton = tw.button`text-cyan-600 hover:text-cyan-700 border rounded-xl bg-teal-400 p-4`

    return (
        <HomeContainer>
            <Content>
                <GradientBackgroundCard/>
                <MainCard>
                    <MainCardContent>
                        <Header> ScratchList </Header>
                        <div className="divide-y divide-gray-200 text-center">
                            <TypeWriterContainer>
                                <p>The one-stop application for </p>
                                <TypeWriterEffect
                                    textStyle={ {
                                        'textAlign': 'center'
                                    } }
                                    cursorColor="#3F3D56"
                                    multiText={ ListTypes }
                                    multiTextDelay={ 1000 }
                                    multiTextLoop
                                    typeSpeed={ 100 }
                                />
                            </TypeWriterContainer>
                            <ActionButtonContainer className="">
                                <GetStartedButton onClick={ createNewList }> Get Started! &rarr;</GetStartedButton>
                            </ActionButtonContainer>
                        </div>
                    </MainCardContent>
                </MainCard>
            </Content>
        </HomeContainer>
    );
}

