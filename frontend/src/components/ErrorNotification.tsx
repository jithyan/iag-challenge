import { useSelector } from "react-redux";
import { IStoreState } from "../data/reducers";
import { Row, Col } from "./Grid";

export function ErrorNotification() {
  const error = useSelector<IStoreState, string>((state) => state.error);
  return error ? (
    <Row bottomMargin="medium">
      <Col>
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Col>
    </Row>
  ) : null;
}
