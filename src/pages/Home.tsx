import React, { useState } from "react";
// import image from "../assets/images/abc.png";
import { Button, Table } from "antd";
import { useMutation, useQuery } from "react-query";
import { createCategory, getAllCategories } from "api/categories";
import Modal from "antd/lib/modal/Modal";
import Input from "components/Input";
import { useNavigate } from "react-router-dom";
export default () => {
    const { data = [], refetch: refetchData } = useQuery("getCategory", getAllCategories);

    const { mutate: onCreateCategory } = useMutation("createCategory", createCategory);

    const [openModal, setOpenModal] = useState(false);

    let navigate = useNavigate();

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
        const data = await onCreateCategory(modalData);
        setOpenModal(false);
        refetchData();
    };

    return (
        <div>
            <Modal
                title="Add Danh mục sản phẩm"
                visible={openModal}
                onOk={onSaveData}
                onCancel={() => setOpenModal(false)}>
                <Input
                    title={"Tên danh mục"}
                    onChange={({ target }) => setModalData({ ...modalData, name: target.value })}
                    value={modalData.name}
                />
                <Input
                    title={"Alias Category Name"}
                    onChange={({ target }) =>
                        setModalData({ ...modalData, aliasName: target.value })
                    }
                    value={modalData.aliasName}
                />
            </Modal>
            <div className=" p-5  flex flex-row justify-between items-center">
                <h1 className="text-lg">Danh sách Category</h1>
                <Button onClick={() => setOpenModal(true)}>Tạo mới</Button>
            </div>
            <Table
                dataSource={data}
                onRow={(record) => {
                    return {
                        onClick: (event) => {
                            navigate(`/menu-item/${record._id}`);
                        },
                    };
                }}
                columns={columns}
            />
        </div>
    );
};
