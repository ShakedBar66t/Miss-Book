const { useState } = React

export function LongTxt({ txt, length }) {

    const [isLongTxtShown, setLongTxtShown] = useState(false)

    function getTxtToShow(isLongTxtShown, txt, length) {
        return (txt.length < length || isLongTxtShown) ? txt : txt.substring(0, length + 1) + '...'
    }

    function onToggleLongTxt() {
        setLongTxtShown(!isLongTxtShown)
    }

    return <div>
        <p>{getTxtToShow(isLongTxtShown, txt, length)}</p>
        {txt.length > length && <button onClick={onToggleLongTxt}> {isLongTxtShown ? 'Read Less' : 'Read More'}</button>}
    </div>

    // return <p>
    //     {txt.length < length && <div>
    //         {txt}
    //     </div>}
    //     {txt.length > length && <div>
    //         {isLongTxtShown && <div>
    //             {firstTxt}
    //             <button onClick={() => onToggleLongTxt()}>Read More</button>
    //         </div>}
    //     </p>
        }