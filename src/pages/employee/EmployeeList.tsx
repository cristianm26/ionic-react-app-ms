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
import { Employee } from "./Employee";
import { searchEmployees, removeEmployee } from "./EmployeeApi";

const EmployeeList: React.FC = (props: any) => {
  const [clientes, setClientes] = useState<Employee[]>([]);
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchEmployees();
    setClientes(result);
  };

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  };

  const addEmployee = () => {
    history.push('/page/employee/new');
  }

  const editEmployee = (id: string) => {
    history.push('/page/employee/' + id);
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
          <IonTitle>Gestión de Empleados</IonTitle>

          <IonItem>
            <IonButton
              onClick={addEmployee}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar Empleados
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
              <IonCol>Salario</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {clientes.map((cliente: Employee) => (
              <IonRow key={cliente.id}>
                <IonCol>
                  {cliente.firstname} {cliente.lastname}
                </IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.salary}</IonCol>
                <IonCol>
                  <IonButton
                    onClick={() => editEmployee(String(cliente.id))}
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

export default EmployeeList;
