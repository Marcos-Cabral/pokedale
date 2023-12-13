import React, { createContext, useContext, useState, ReactNode } from 'react';

export const generation: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface GameContextType {
    selectedGenerations: number[];
    handleGenerations: (array: number[]) => void;
}
const initialGenerations = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const GameContext = createContext<GameContextType>({
    handleGenerations: () => { },
    selectedGenerations: initialGenerations,
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [generation, setGeneration] = useState<number[]>(initialGenerations);
    const handleGenerations = (array: number[]) => {
        setGeneration(array);
    };
    return (
        <GameContext.Provider
            value={{
                selectedGenerations: generation,
                handleGenerations: handleGenerations
            }}
        >
            {children}
        </GameContext.Provider>
    );
};