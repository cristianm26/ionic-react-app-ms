import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Customer } from "./Customer";
import { searchCustomers, removeCustomer } from "./CustomerApi";

const CustomerList: React.FC = (props: any) => {
  const [clientes, setClientes] = useState<Customer[]>([]);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);
  };

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  };

  const addCustomer = () => {
    history.push("/page/customer/new");
  };

  const editCustomer = (id: string) => {
    history.push("/page/customer/" + id);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de Clientes</IonTitle>

          <IonItem>
            <IonButton
              onClick={addCustomer}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar Cliente
            </IonButton>
          </IonItem>

          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{name}</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid>
            <IonRow className="table">
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Telefono</IonCol>
              <IonCol>Direccion</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {clientes.map((cliente: Customer) => (
              <IonRow key={cliente.id}>
                <IonCol>
                  {cliente.firstname} {cliente.lastname}
                </IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.address}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editCustomer(String(cliente.id))}
                    fill="clear"
                    color="primary"
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    fill="clear"
                    color="danger"
                    onClick={() => remove(String(cliente.id))}
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
