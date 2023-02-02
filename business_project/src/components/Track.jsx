import Header from "./Header";

export default function Track (props){
    return (<div>
        <Header success={props.getDownData} name={props.getDownData2}/>
        <h1>This will be the page of a single track after clicking on it in the main page</h1>
    </div>)
}