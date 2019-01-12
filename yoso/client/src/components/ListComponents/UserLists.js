import React, { Component } from "react";
import ShowItems from "../../components/ListComponents/ShowItems";
import { MyContext } from "../../App";
import {
  Collapsible,
  Col,
  Row,
  CollapsibleItem,
  Container,
  Button,
  Icon
} from "react-materialize";
import ListAPI from "../../utilities/ListAPI";
import { Link } from "react-router-dom";
import ItemAPI from "../../utilities/ItemAPI";

export default class UserLists extends Component {
  state = {};

  handleDeleteList = (e, userId, listId, cb) => {
    e.preventDefault();
    console.log(
      `Delete button pushed inside userlist to delete a list id# ${listId}`
    );
    ListAPI.deleteList(userId, listId).then(response => cb(userId));
  };
  handleDeleteItem = (e, userId, listId, itemId, cb) => {
    e.preventDefault();
    console.log(
      `Delete button pushed inside userlist to delete a list id# ${listId} and item id: ${itemId}`
    );
    ItemAPI.deleteItem(listId, itemId).then(response => cb(userId));
  };
  getItems = id => {
    ItemAPI.getItems(id).then(res => {
      console.log(`From getlists at userLists, here's the user's lists: `, res);
      this.setState({
        items: res.data
      });
    });
  };
  render() {
    console.log(
      `inside the render method of userlists, here's props: `,
      this.props
    );
    return (
      <MyContext.Consumer>
        {context => {
          console.log(`context.state in userlist is `, context.state);
          console.log(`context.state.lists = `, context.state.lists);
          console.log(
            `context.state.lists[0].name = ${
              context.state.lists[0].name
            } and context.state.lists[0].id = ${context.state.lists[0].id}`
          );
          const lists = context.state.lists.map((list, index) => (
            <Collapsible key={index} accordion defaultActiveKey={1}>
              <CollapsibleItem header={list.name}>
                <Col s={3}>
                  <Button
                    onClick={e =>
                      this.handleDeleteList(
                        e,
                        context.state.id,
                        list.id,
                        context.state.getLists
                      )
                    }
                  >
                    {" "}
                    <Icon data-index={index}>delete_forever</Icon>
                    <br />
                  </Button>
                </Col>
                <Col s={3} offset="6" className="right">
                  <Button>
                    <Icon data-index={index}>send</Icon>
                  </Button>
                </Col>

                <ShowItems
                  key={list.id}
                  listId={list.id}
                  name={list.name}
                  currentList={list.lists}
                  getItems={this.getItems}
                  onClick={e =>
                    this.handleDeleteItem(
                      e,
                      context.id,
                      list.id,
                      this.key,
                      context.state.getLists
                    )
                  }
                />
              </CollapsibleItem>
            </Collapsible>
          ));
          return (
            <Container className="center-align">
              <h1>{this.props.view}</h1>
              <Row>
                <Col s={3}>
                  <Link to="/lists" onClick={this.props.handleClick}>
                    <br />
                    <br />
                    <br />
                    <Button>
                      <Icon>arrow_back</Icon>
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <h1 className="white-text center-align">
                    {context.state.first.toUpperCase()}'S LISTS
                  </h1>
                </Col>
              </Row>
              <Row>{lists}</Row>
            </Container>
          );
        }}
      </MyContext.Consumer>
    );
  }
}
UserLists.contextType = MyContext;
