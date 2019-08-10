import React from 'react';
import { Jumbotron } from 'reactstrap';
import './Jumbo.css';

const Jumbo = (props) => {
    return (

            <Jumbotron className="Jumbo">
                {/*<h1 className="display-3 text-center ">*/}
                {/*    Programming<br />*/}
                {/*    A r t i f i c i a l<br/>*/}
                {/*    Intelligence*/}
                {/*</h1>*/}
                {/*<p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>*/}

                <hr className="my-4" />

                <h6 className="text-center ">
                    <p>PAI는 Programming Artificial Intelligence의 약자로써 인공지능에 대해 공부하고 개발하는 동아리입니다.</p>
                    <p>머신러닝과 딥러닝을 공부하고 다양한 분야에 인공지능 시스템을 적용해보는 것이 목표입니다.</p>
                    <p>교육, 스터디 그리고 세미나를 통해 정보를 공유하면서 동아리원 모두의 지속가능한 성장을 추구합니다.</p>
                </h6>


                <hr className="my-4" />


                <h6 className="text-center ">
                    {/*<p>동아리 운영</p>*/}
                    <p>내부 정기 세미나(인공지능 최신 기술 동향 토론)</p>
                    <p>신입생 대상 교육(Python, Machine Learning 기본 개념)</p>
                    <p>프로젝트 팀 구성(Vision, NLP, Medical, Game, Music 등)</p>
                    <p>Samsung Bixby Challenge 공모전 참가</p>
                    <p>Naver Clova 인공지능 아이디어 Challenge 공모전 참가</p>


                </h6>

            </Jumbotron>

    );
};

export default Jumbo;