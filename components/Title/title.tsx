import React from 'react';

const Title = ({ name }: { name: string }) => {
    return (
        <>
            <div className='flex justify-start mb-10'>
                <p className='font-bold text-black capitalize'>{name}</p>
            </div>
        </>
    )
}

export default Title;
