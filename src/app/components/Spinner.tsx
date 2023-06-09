import React from 'react';

const Spinner = (): React.JSX.Element => {
    return (
        <div className="flex items-center justify-center z-50 h-screen w-screen bg-wash dark:bg-wash-dark">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-brand"></div>
        </div>
    );
};

export default Spinner;