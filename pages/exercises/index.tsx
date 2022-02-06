import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import { useEffect, useState } from "react";
import { Accordion, Col, Container, Form, Row } from "react-bootstrap";
import AccordionAdditional from "../../components/AccordionAdditional";

export interface IShowExercisesProps {}

// TOOD: replace this with an API call to /api/categories.
const exercise_categories = [
  { id: 1, name: "All" },
  { id: 8, name: "Arms" },
  { id: 9, name: "Legs" },
  { id: 10, name: "Abs" },
  { id: 11, name: "Chest" },
  { id: 12, name: "Back" },
  { id: 13, name: "Shoulders" },
  { id: 14, name: "Calves" },
];

// TODO: replace this with an API call to /api/muscles.
const muscles_to_check = [
  { id: 1, name: "Biceps brachii" },
  { id: 2, name: "Anterior deltoid" },
  { id: 3, name: "Serratus anterior" },
  { id: 4, name: "Pectoralis major" },
  { id: 5, name: "Triceps brachii" },
  { id: 6, name: "Rectus abdominis" },
  { id: 7, name: "Gastrocnemius" },
  { id: 8, name: "Gluteus maximus" },
  { id: 9, name: "Trapezius" },
  { id: 10, name: "Quadriceps femoris" },
  { id: 11, name: "Biceps femoris" },
  { id: 12, name: "Latissimus dorsi" },
  { id: 13, name: "Brachialis" },
  { id: 14, name: "Obliquus externus abdominis" },
  { id: 15, name: "Soleus" },
  { id: 16, name: "Erector spinae" },
];

interface ErrorMessage {
  message: string;
}

export default function ShowExercises(props: IShowExercisesProps) {
  // The search parameters state
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // API call state
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<ErrorMessage | undefined>(undefined);
  const [items, setItems] = useState(new Array());

  // Hook: Force a call if category or search changes
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `/api/exercises?category=${category}${
          search !== "" ? "&search=" + search : ""
        }`
      );

      // TODO: Error handling

      // Chuck the result into the items
      if (Array.isArray(result.data)) {
        setItems(result.data);
        setLoaded(true);
      }
    };

    fetchData();
  }, [category, search]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Container>
          <Row>
            <Col>
              <h1>Exercise Picker</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Select
                name="exercise_choice"
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={category}
              >
                {exercise_categories.map((e) => {
                  return <option key={e.id}>{e.name}</option>;
                })}
              </Form.Select>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
          <Accordion>
            {items.map((e) => {
              return (
                <Accordion.Item key={e.id} eventKey={e.id}>
                  <Accordion.Header>{e.name}</Accordion.Header>
                  <Accordion.Body>
                    <div
                      dangerouslySetInnerHTML={{ __html: e.description }}
                    ></div>
                    <hr />
                    <Row>
                      <Col>
                        <AccordionAdditional
                          precursor="Muscles Used: "
                          named={e.exercise_base.muscles}
                        ></AccordionAdditional>
                      </Col>
                      <Col>
                        <AccordionAdditional
                          precursor="Equipment: "
                          named={e.exercise_base.equipment}
                        ></AccordionAdditional>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Container>
      </>
    );
  }
}
