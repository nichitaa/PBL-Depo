import React from 'react';

export default function Home() {
    const projects = ["url(assets/img/my/me.jpg)", "url(assets/img/my/sss.jpg)", "url(assets/img/my/me1.jpg)"];
    return (
        <>
            <div className="text-center" style={{width: "100%"}}>
                <p className="d-xl-flex justify-content-xl-center align-items-xl-center"
                   data-aos="fade-up"
                   data-aos-duration="500"
                   data-aos-delay="300"
                   id="depo"
                   style={{
                       height: "108px",
                       lineHeight: "68px",
                       letterSpacing: "4px",
                       margin: '0',
                       marginTop: "94px",
                       marginBottom: "27px",
                       fontFamily: 'Montserrat Black'
                   }}>
                    <strong>PBL Depo</strong></p>
                <p className="d-lg-flex d-xl-flex justify-content-lg-center align-items-lg-center justify-content-xl-center"
                   data-aos="fade-up"
                   data-aos-duration="500"
                   data-aos-delay="500"
                   style={{
                       lineHeight: "49px",
                       fontSize: "30px",
                       marginBottom: "0",
                       height: "6.5%"
                   }}>PBL projects&nbsp;</p>
            </div>
            <p className="d-flex d-sm-flex d-md-flex d-lg-flex d-xl-flex justify-content-center align-items-center justify-content-sm-center justify-content-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center"
               data-aos="fade-up"
               data-aos-duration="500"
               data-aos-delay="700"
               style={{
                   height: "80px",
                   marginBottom: "0",
                   fontSize: "30px",
               }}>
                <br/>
                now closer than ever
                <br/><br/></p>
            <p className="d-flex d-sm-flex d-md-flex d-xl-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-xl-center align-items-xl-center"
               data-aos="fade-down"
               data-aos-duration="500"
               id="recent_projects">
                Recent Projects
            </p>
            <hr data-aos="fade-down"
                data-aos-duration="500"
                id="hr"/>

            <div className="d-md-flex justify-content-md-center team-grid" style={{backgroundColor: "transparent"}}>
                <div className="container">
                    <div className="intro"/>
                    <div>
                        <div
                            className="row d-md-flex d-xl-flex justify-content-md-center align-items-md-center justify-content-xl-center align-items-xl-center people"
                            style={{height: "352px"}}>
                            {
                                projects.map(project => {
                                    return (
                                        <div className="col-md-4 col-lg-3 item" key={project}>
                                            <div
                                                className="d-flex d-lg-flex align-items-end justify-content-lg-center align-items-lg-end box"
                                                data-aos="zoom-out" data-aos-duration="500"
                                                data-aos-delay="500"
                                                id="project_card"
                                                style={{backgroundImage: project}}>
                                                <button
                                                    className="btn btn-primary d-flex d-md-flex d-xl-flex justify-content-center align-items-center justify-content-lg-center"
                                                    id="read-more" type="button">
                                                    Read more
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

