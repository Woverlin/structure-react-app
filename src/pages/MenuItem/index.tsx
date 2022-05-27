import React, { useEffect, useState } from "react";
// import image from "../assets/images/abc.png";
import { Button, Table } from "antd";
import { useMutation, useQuery } from "react-query";
import { createCategory, getAllCategories } from "api/categories";
import Modal from "antd/lib/modal/Modal";
import Input from "components/Input";
import { createMenuItem, getMenuItem } from "api/menuItem";
import Search from "antd/lib/input/Search";
import { useParams } from "react-router-dom";
export default () => {

    const params = useParams();

    const categoryId = params?.id;

    const [textSearch, setTextSearch] = useState('')

    const { data = [], refetch: refetchData } = useQuery(
        [`getMenuItem ${categoryId} ${textSearch}`, categoryId],
        () => getMenuItem(categoryId, textSearch)
    );
    const { mutate: onCreateMenuItem } = useMutation("createMenuItem", createMenuItem);

    const [openModal, setOpenModal] = useState(false);

    const [menuItems, setMenuItems]:any = useState([]);

    useEffect(() => {
        setMenuItems(data);
    }, [data.length])

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "alias Name",
            dataIndex: "aliasName",
            key: "aliasName",
        },
    ];

    const [modalData, setModalData]: any = useState({});

    const onSaveData = async () => {
        await onCreateMenuItem({ ...modalData, category: categoryId });
        setOpenModal(false);
        refetchData();
    };

    const onDeleteMenuItem = async (id: any) => {
        await onDeleteMenuItem(id);
        refetchData();
    };

    const onSearch = (value: any) => {
        setTextSearch(value);
    };

    return (
        <div>
            <Modal
                title="Thêm sản phẩm"
                visible={openModal}
                onOk={onSaveData}
                onCancel={() => setOpenModal(false)}>
                <Input
                    title={"Tên sản phẩm"}
                    onChange={({ target }) => setModalData({ ...modalData, name: target.value })}
                    value={modalData.name}
                />
                <Input
                    title={"Alias Menu item Name"}
                    onChange={({ target }) =>
                        setModalData({ ...modalData, aliasName: target.value })
                    }
                    value={modalData.aliasName}
                />
            </Modal>
            <div className=" p-5  flex flex-row justify-between items-center ">
                <h1 className="text-lg">Danh sách Sản phẩm</h1>
                <Button onClick={() => setOpenModal(true)}>Tạo mới</Button>
            </div>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
            <Table
                dataSource={menuItems.map((item: any, index: number) => ({
                    ...item,
                    key: index,
                    index,
                }))}
                columns={columns}
            />
        </div>
    );
};
