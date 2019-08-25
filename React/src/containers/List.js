
import React, { Component } from 'react';
import { Container, Table, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './List.css';






class List extends Component {


    render() {
        return (

            <div className = "List" >



            <Table>
                <thead align="center">
                    <tr>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>

                    </tr>
                </thead>

                    <tbody >
                        <tr>
                            <th>[공지] 개인정보 처리방침 개정안내</th>
                            <td align="center">허세훈</td>
                            <td align="center">2019-08-07</td>

                         </tr>
                        <tr>
                            <th>위치기반서비스 이용약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th>카카오 전자금융거래 이용약관 변경 사전 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th>카카오 통합 약관 및 서비스 약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th>위치기반서비스 이용약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th>위치기반서비스 이용약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th scope="row">위치기반서비스 이용약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>
                         <tr>
                            <th>위치기반서비스 이용약관 변경 안내</th>
                            <td align="center">김태완</td>
                            <td align="center">2019-08-03</td>

                        </tr>




                    <tr>
                            <th>카카오 결제서비스 운영정책 신설 사전 안내</th>
                            <td align="center">원준호</td>
                            <td align="center">2019-07-29</td>

                        </tr>
                    <tr>
                            <th>카카오 결제서비스 운영정책 신설 사전 안내</th>
                            <td align="center">원준호</td>
                            <td align="center">2019-07-29</td>

                        </tr>
                    </tbody>

            </Table>








            </div>
        );
    }



}




export default List;