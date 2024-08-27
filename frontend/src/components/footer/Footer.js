

const Footer = ()=>{
    return(
        <footer className="footer py-5">
            <div className="container">
                <div className="row">
                    <div className="col-8 mx-auto text-center mt-1">
                        <p className="mb-0 text-secondary">
                            Copyright © <script>
                            document.write(new Date().getFullYear())
                            </script> Dashboard by Active Telematics Sdn. Bhd.
                        </p>
                        <p className="mb-0 text-secondary" >Powered by xloop digital</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;