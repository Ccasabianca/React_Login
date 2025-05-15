import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";
import OfferList from "../components/OfferList";

const OfferProList = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("https://offers-api.digistos.com/api/offers/pro", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { data: offers, message } = await response.json();

        if (!response.ok) {
          throw new Error(message || "Erreur lors du chargement des offres.");
        }

        setOffers(offers);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des offres.");
        console.error(err.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [token]);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-5 text-center">
        {error}
      </Alert>
    );
  }

  return <OfferList offers={offers} />;
};

export default OfferProList;
