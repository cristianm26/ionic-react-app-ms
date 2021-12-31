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
import Supplier from "./Supplier";

import { searchSuppliers, removeSupplier } from "./SupplierApi";

const SupplierList: React.FC = (props: any) => {
  const [clientes, setClientes] = useState<Supplier[]>([]);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchSuppliers();
    setClientes(result);
  };

  const remove = async (id: string) => {
    await removeSupplier(id);
    search();
  };

  const addSupplier = () => {
    history.push('/page/supplier/new');
  }

  const editSupplier = (id: string) => {
    history.push('/page/supplier/' + id);
  }
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
          <IonTitle>Gestión de Proveedores</IonTitle>

          <IonItem>
            <IonButton
              onClick={addSupplier}
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
              <IonCol>Web</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {clientes.map((cliente: Supplier) => (
              <IonRow key={cliente.id}>
                <IonCol>{cliente.name}</IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.web}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editSupplier(String(cliente.id))}
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

export default SupplierList;
