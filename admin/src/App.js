import http from './api/index';
import { Table, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import '../src/app.css';

function App() {
  const [list, setList] = useState([]);
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const columns = [
    {
      title: 'name',
      dataIndex: 'username',
    },
    {
      title: 'password',
      dataIndex: 'pwd',
    },
    {
      title: 'delete',
      render: (text, row) => (
        <Button
          onClick={async () => {
            try {
              await http({
                method: 'post',
                path: '/users/del',
                params: {
                  _id: row._id,
                },
              });
              getList();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          删除
        </Button>
      ),
    },
    {
      title: 'update',
      render: (text, row) => (
        <Button
          onClick={async () => {
            try {
              await http({
                method: 'post',
                path: '/users/update',
                params: {
                  _id: row._id,
                  username: username,
                  pwd: pwd,
                },
              });
              getList();
            } catch (e) {
              console.error(e);
            }
          }}
        >
          修改
        </Button>
      ),
    },
  ];
  const getList = async () => {
    const { data } = await http({
      method: 'get',
      path: '/users/find',
    });
    console.log(data);
    setList(data.result);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className='contain' style={{ width: 700, height: 500 }}>
      <Input
        value={username}
        placeholder='username'
        style={{ width: 200 }}
        onChange={(e) => {
          const { value } = e.target;
          setUsername(value);
        }}
      ></Input>
      <Input
        value={pwd}
        placeholder='pwd'
        style={{ width: 200 }}
        onChange={(e) => {
          const { value } = e.target;
          setPwd(value);
        }}
      ></Input>
      <Button
        onClick={async () => {
          try {
            await http({
              method: 'post',
              path: '/users/add',
              params: {
                username: username,
                pwd: pwd,
              },
            });
            getList();
          } catch (e) {
            console.error(e);
          }
        }}
      >
        add
      </Button>
      <Table dataSource={list} columns={columns}></Table>
    </div>
  );
}

export default App;
