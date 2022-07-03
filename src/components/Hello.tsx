import React from 'react';
type helloProps = {
    children: React.ReactNode;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function Hello({ children, handleClick }: helloProps) {
    return (
        <div>
            <button onClick={(e) => handleClick(e)}>click me</button>
            {children}
        </div>
    );
}
