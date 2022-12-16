import {React, useEffect, useState} from 'react';
import { Container, Table, Col, Row, Button, Form } from 'react-bootstrap';

function App() {
  const [tableData, setTableData] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [brand, setBrand] = useState("");
  const [date, setDate] = useState(null);
  const [size, setSize] = useState(0.0);
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [isBought, setIsBought] = useState(false);

  const [updateItemId, setUpdateItemId] = useState(0);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState(0.0);
  const [newBrand, setNewBrand] = useState("");
  const [newDate, setNewDate] = useState(null);
  const [newSize, setNewSize] = useState(0.0);
  const [newModel, setNewModel] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);
  const [newIsBought, setNewIsBought] = useState(false);

  useEffect(() => {
    fetch("https://localhost:44346/api/ClothesItems")
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTableData(data);
      })
  }, [tableData]);

  function addRecord(e){
    e.preventDefault();
    
    const obj = {
      name: name,
      price: price,
      brand: brand,
      date: date + "T00:00:00",
      size: size,
      model: model,
      quantity: quantity,
      isBought: isBought
    }

    fetch("https://localhost:44346/api/ClothesItems", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
  }

  function deleteRecord(recordId){
    fetch("https://localhost:44346/api/ClothesItems/" + recordId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.status);
    })
  }

  function updateRecord(e){
    e.preventDefault();
    
    const obj = {
      id: updateItemId,
      name: newName,
      price: newPrice,
      brand: newBrand,
      date: newDate + "T00:00:00",
      size: newSize,
      model: newModel,
      quantity: newQuantity,
      isBought: newIsBought
    }

    fetch("https://localhost:44346/api/ClothesItems", {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(res => {
      console.log(res.status);
    })

    setUpdateItemId(0);
    setNewName("");
    setNewPrice(0.0);
    setNewBrand("");
    setNewDate("");
    setNewSize(0.0);
    setNewModel("");
    setNewQuantity(0);
    setNewIsBought(false);
  }

  function selectRecordToUpdate(record){
    setUpdateItemId(Number(record.id));
    setNewName(record.name);
    setNewPrice(record.price);
    setNewBrand(record.brand);

    let strDate = record.date;

    setNewDate(strDate.split("T")[0]);
    setNewSize(record.size);
    setNewModel(record.model);
    setNewQuantity(record.quantity);
    setNewIsBought(record.isBought);
  }

  return (
    <> 
    <Container fluid>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Date Added</th>
                <th>Size</th>
                <th>Model</th>
                <th>Quantity</th>
                <th>IsBought</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>                         
            </thead>
            <tbody>  
              {tableData && tableData.map((record) => {
                return (
                    <tr>
                      <td>{record.id}</td>
                      <td>{record.name}</td>
                      <td>{record.price}</td>
                      <td>{record.brand}</td>
                      <td>{record.date.split("T")[0]}</td>
                      <td>{record.size}</td>
                      <td>{record.model}</td>
                      <td>{record.quantity}</td>
                      <td>{String(record.isBought)}</td>
                      <td>{record.discount}</td>
                      <td>
                        <div>
                          <Button onClick={() => selectRecordToUpdate(record)}>Update</Button>
                          <Button style={{marginLeft: 5, marginRight: 5}} onClick={() => deleteRecord(record.id)}>Delete</Button>
                        </div>                       
                      </td>
                    </tr>
                  )            
                }
              )}               
            </tbody>
          </Table>
        </Col>
        <Col lg={2}>
          <Row>
            <Form>
              <Form.Label><b>Add new record:</b></Form.Label>   

              <br></br>

              <Form.Label>Name</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter name' onChange={(e) => setName(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Price</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter price' onChange={(e) => setPrice(Number(e.target.value))}/>
              </Form.Group> 

              <Form.Label>Brand</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter brand' onChange={(e) => setBrand(e.target.value)}/>
              </Form.Group> 

              <Form.Label>Date</Form.Label>  
              <Form.Group>
                <Form.Control type="date" placeholder='Enter date' onChange={(e) => setDate(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Size</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter size' onChange={(e) => setSize(Number(e.target.value))}/>
              </Form.Group>  

              <Form.Label>Model</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter model' onChange={(e) => setModel(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Quantity</Form.Label>  
              <Form.Group>
                <Form.Control type="text" placeholder='Enter quantity' onChange={(e) => setQuantity(Number(e.target.value))}/>
              </Form.Group>  

              <Form.Label>IsBought</Form.Label>  
              <Form.Select onChange={(e) => setIsBought(Boolean(e.target.value))}>
                <option>Choose:</option>
                <option value="1">True</option>
                <option value="">False</option>
              </Form.Select>

              <br></br>

              <Button type="button" style={{width: 150}} onClick={addRecord}>Add</Button>
            </Form> 
          </Row>
        </Col>
        <Col lg={2}>
          <Row>
            <Form>
              <Form.Label><b>Update record:</b></Form.Label>   

              <br></br>
              
              <Form.Label>Name</Form.Label> 
              <Form.Group>
                <Form.Control value={newName} type="text" onChange={(e) => setNewName(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Price</Form.Label> 
              <Form.Group>
                <Form.Control value={newPrice} type="text" onChange={(e) => setNewPrice(Number(e.target.value))}/>
              </Form.Group> 

              <Form.Label>Brand</Form.Label> 
              <Form.Group>
                <Form.Control value={newBrand} type="text" onChange={(e) => setNewBrand(e.target.value)}/>
              </Form.Group> 

              <Form.Label>Date</Form.Label>  
              <Form.Group>
                <Form.Control value={newDate} type="date" onChange={(e) => setNewDate(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Size</Form.Label>  
              <Form.Group>
                <Form.Control value={newSize} type="text" onChange={(e) => setNewSize(Number(e.target.value))}/>
              </Form.Group>  

              <Form.Label>Model</Form.Label>  
              <Form.Group>
                <Form.Control value={newModel} type="text" onChange={(e) => setNewModel(e.target.value)}/>
              </Form.Group>  

              <Form.Label>Quantity</Form.Label>  
              <Form.Group>
                <Form.Control value={newQuantity} type="text" onChange={(e) => setNewQuantity(Number(e.target.value))}/>
              </Form.Group> 

              <Form.Label>IsBought</Form.Label>  
              <Form.Select value={newIsBought ? "1" : ""} onChange={(e) => setNewIsBought(Boolean(e.target.value))}>
                <option>Choose:</option>
                <option value="1">True</option>
                <option value="">False</option>
              </Form.Select>

              <br></br>

              <Button type="button" style={{width: 150}} onClick={updateRecord}>Update</Button>
            </Form> 
          </Row>
        </Col>
      </Row>
    </Container>
      
    </>
  );
}

export default App;
