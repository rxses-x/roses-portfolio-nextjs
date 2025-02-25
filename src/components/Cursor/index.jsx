// @ts-nocheck
import React, { useEffect, useState } from "react";
import CustomCursor from 'custom-cursor-react';
import 'custom-cursor-react/dist/index.css';
import { useTheme } from 'next-themes';

const Cursor = () => {
    const theme = useTheme();
    const [ mounted, setMounted ] = useState(false);

    const getTheme = () => {
        if ((theme.theme === 'dark') || (theme.theme === 'system')) {
            return '#fff';
        } else {
            return '#000';
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <>
            { mounted && (
                <CustomCursor
                    targets={['.link']}
                    customClass="custom-cursor"
                    dimensions={30}
                    fill={ getTheme() }
                    smoothness={{
                        movement: 0.2,
                        scale: 0.1,
                        opacity: 0.2,
                    }}
                    targetOpacity={0.5}
                    targetScale={2}
                />
            )}
        </>
    )
}

export default Cursor;