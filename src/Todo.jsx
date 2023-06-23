import { Space, Table, Modal, Input } from "antd";                //antd desigen tags
import React, { useState } from "react";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";         //antd desigen icons
import "./App.css";
const Todo = () => {
                                                // useState hooks for funtionality and data
  const [Edit, setEdit] = useState(false)             
  const [isEdit, setIsEdit] = useState(null);
  const [dataSource, setDataSource] = useState([
    {                                               //Data for the Table
      id: "1",
      name: "Bilal",
      email: "asaz44590@gmail.com",
      address: "Lord hill",
    },
    {
      id: "2",
      name: "waqas",
      email: "wiqi90@gmail.com",
      address: "north fole",
    },
    {
      id: "3",
      name: "amjad",
      email: "amji--00@gmail.com",
      address: "florida",
    },
    {
      id: "4",
      name: "sadiq",
      email: "sadi90@gmail.com",
      address: "janga manga",
    },
  ]);

  const columns = [                     // props inside the Table tags
    {
      key: "1",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "2",
      title: "Emill",
      dataIndex: "email",
    },
    {
      key: "3",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Action",
      render: (preData) => {
        return (
          <>
            <EditOutlined onClick={()=>{
              onEdit(preData)
            }}/>
            <DeleteOutlined
              onClick={() => {
                onDelate(preData);
              }}
              style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];


                                   // funtionality for delate operation
  const onDelate = (preData) => {
    Modal.confirm({
         title: 'Are You sure you want to Delate this id:',
         okType:'danger',
         okText:'Yes',
     onOk: ()=>{
    setDataSource((pre) => {
      return pre.filter((student) => student.id !== preData.id);
    });
     },
});
  };


                                      //   functionality for add opertaion
  const onAdd = () => {
    const randomAdd = parseInt(Math.random() * 100);
    const newAdd = {
      id: randomAdd,
      name: "name" + randomAdd,
      email: "@gmail.com" + randomAdd,
      address: "address" + randomAdd,
    };
    setDataSource((pre) => {
      return [...pre, newAdd];
    });
  };


                                   // functionality for eddit operatio
    const onEdit = (preData) =>{
      setEdit(true)
      setIsEdit({...preData})
    }
     
    const resetEdit = () => {
      setEdit(false)
      setIsEdit(null)
    }



  return (
    <div className="App">
      <header className="App-header">
        <Space direction="vertical">
          <PlusOutlined onClick={onAdd} className="add" />
          <Table columns={columns} dataSource={dataSource} pagination={{pageSize:'7'}}></Table>
         <Modal maskClosable={false}
         title='Edit Here'
         open ={Edit}
         onCancel={()=>{
          resetEdit();                                 // funtion calling
        }}
         onOk={()=>{
          resetEdit();       //function calling
          
          setDataSource((pre)=>{                  
            return(pre.map((preElem)=>{
              if(preElem.id === isEdit.id){
                return isEdit
              }
              else{
               return preElem;
              }
            }))
          })
         }}>                                        {/* Input Inside the Modal Tags  */}
          <Space direction="vertical" style={{width:'100%'}}>
          <Input value={isEdit?.name}
          onChange={(e)=>{
            setIsEdit((pre)=>{
              return({...pre, name: e.target.value})
            })
          }}/>
           <Input value={isEdit?.email}
          onChange={(e)=>{
            setIsEdit((pre)=>{
              return({...pre, email: e.target.value})
            })
          }}/>
           <Input value={isEdit?.address}
          onChange={(e)=>{
            setIsEdit((pre)=>{
              return({...pre, address: e.target.value})
            })
          }}/>
          </Space>
         </Modal>
        </Space>
      </header>
    </div>
  );
};

export default Todo;
