
const ShowAllCompanys = ({showAll}) => {

    return (
        <div className="shop__show-all">
            <button
            className="shop__show-all-buttom"
            onClick={showAll}
            >Show all companys</button>
        </div>
    )
}

export default ShowAllCompanys;