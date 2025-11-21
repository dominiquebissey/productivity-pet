import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function DeleteAccount() {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const petName = axiosPrivate.get("/avatar/").then(res => res.data.pet_name).catch(() => "your pet");

    const handleDelete = async () => {
        if (!window.confirm("You're really going to abandon your pet?")) {
            return;
        }

        try {
            const res = await axiosPrivate.delete("/delete/");

            if (res.status === 204) {
                localStorage.removeItem("refresh");
                localStorage.removeItem("persist");

                // Redirect to login
                navigate("/login");
            }
        } catch (err) {
        console.error("Delete error:", err);
        alert("Could not delete account.");
        }
    };

    const handleReturn = () => {
        navigate("/");
    };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Card style={{ padding: "20px", width: "200px" }}>
            <h3>Delete Account</h3>
            <p>This action is permanent and cannot be undone.</p>
            <Button variant="danger" onClick={handleDelete}>
            Delete My Account
            </Button>
        </Card>
        <Card style={{ padding: "20px", width: "200px", marginLeft: "20px" }}>
            <h3>Return</h3>
            <p>Decided not to delete your account?</p>
            <Button variant="light" onClick={handleReturn}>
            Return to {petName}
            </Button>
        </Card>
    </div>
  );
}

export default DeleteAccount;