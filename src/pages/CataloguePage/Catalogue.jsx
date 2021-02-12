import React from "react";
import { useDB } from "../../context/DBContext";
import { CardGrid, Loading } from "../../components";
import { Search, Filter } from "./components";
import { Col, Container, Row } from "react-bootstrap";

export default function Catalogue() {
	// displayed projects are a copy of all projects, we use it in order to display the searched projects
	const { displayedProjects: projects, loading } = useDB();

	return (
		<>
			<Container data-aos="fade-up" data-aos-duration="500">
				<Row>
					<Col>
						<Search />
					</Col>
					<Col md="auto">
						<Filter />
					</Col>
				</Row>
			</Container>
			<div
				data-aos="fade-up"
				data-aos-duration="500"
				data-aos-delay="100"
			>
				{loading ? (
					<Loading />
				) : projects ? (
					<CardGrid projects={projects} />
				) : (
					<h1>No Projects Yet</h1>
				)}
			</div>
		</>
	);
}
