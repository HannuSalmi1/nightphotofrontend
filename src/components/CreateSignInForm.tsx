import React, { useState, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

interface SignInForm {
    Username: string;
    Password: string;
}

export default function CreateSignInForm() {
    const [signInForm, setSignInForm] = useState<SignInForm>({
        Username: '',
        Password: '',
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('https://localhost:5000/api/Users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signInForm),
        });
    
        if (response.ok) { // Check if the first fetch succeeded
            try {
                const validityResponse = await fetch('https://localhost:5000/api/Users/checkValidity', {
                    method: 'GET',
                    credentials: 'include', // This is crucial
                });
    
                if (validityResponse.ok && validityResponse.headers.get("Content-Type")?.includes("application/json")) {
                    const data = await validityResponse.json();
                    if (data.message === "JWT is valid") {
                        console.log("JWT validation successful:", data.message);
                        // Perform actions based on successful JWT validation here
                    } else {
                        console.log("JWT validation failed or message is unexpected:", data.message);
                        // Handle unexpected message or failed validation
                    }
                } else {
                    throw new Error('Response was not JSON');
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }};

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignInForm({ ...signInForm, [event.target.name]: event.target.value });
    };

    return (
        <Container className="bg-gray-900 min-h-screen d-flex align-items-center justify-content-center">
            <Form onSubmit={handleSubmit} className="w-100 max-w-sm">
                <h1 className="mb-4 text-center">Log In</h1>

                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            name="Username"
                            value={signInForm.Username}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Col>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="Password"
                            value={signInForm.Password}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                    Log In
                </Button>
            </Form>
        </Container>
    );
}