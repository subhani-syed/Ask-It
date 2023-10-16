const Footer = () =>{
    return (<>
        <div className="flex sticky top-[100vh] justify-between bg-[#69D2E7] border-4 border-black drop-shadow-[4px_4px_0px_black] rounded-[30px] m-10 p-10 ">
            <div>
                <a><h1 className="text-xl">How it works</h1></a>
            </div>
            <div className="flex">
                <h1 className="text-xl mx-5">Lets Connect</h1>
                <a href="https://www.linkedin.com/in/subhani-syed/" target="_blank"><h1 className="text-xl mx-5">LinkedIn</h1></a>
                <a href="https://github.com/subhani-syed" target="_blank"><h1 className="text-xl mx-5">GitHub</h1></a>
                <a href="https://twitter.com/subhan1syed" target="_blank"><h1 className="text-xl mx-5">Twitter</h1></a>
            </div>
        </div>
    </>)
}
export default Footer;