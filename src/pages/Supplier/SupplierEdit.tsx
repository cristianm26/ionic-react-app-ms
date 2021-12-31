import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router";
import Supplier from "./Supplier";
import { saveSupplier, searchSuppliersById } from "./SupplierApi";

const SupplierEdit: React.FC = () => {
  const [supplier, setSupplier] = useState<Supplier>({});
  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const routeMatch: any = useRouteMatch("/page/supplier/:id");
  const id = routeMatch?.params?.id;
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    if (id === "new") {
      setSupplier({});
    } else {
      let result = await searchSuppliersById(id);
      setSupplier(result);
    }
  };

  const save = async () => {
    await saveSupplier(supplier);
    history.push("/page/suppliers");
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
          <IonTitle>
            {id === "new" ? "Agregar Cliente" : "Editar Cliente"}
          </IonTitle>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Nombre</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.name = String(e.detail.value))}
                  value={supplier.name}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Contacto</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (supplier.contact = String(e.detail.value))
                  }
                  value={supplier.contact}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.email = String(e.detail.value))}
                  value={supplier.email}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Telefono</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.phone = String(e.detail.value))}
                  value={supplier.phone}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Dirección</IonLabel>
                <IonInput
                  onIonChange={(e) =>
                    (supplier.address = String(e.detail.value))
                  }
                  value={supplier.address}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Web</IonLabel>
                <IonInput
                  onIonChange={(e) => (supplier.web = String(e.detail.value))}
                  value={supplier.web}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonItem>
            <IonButton
              onClick={save}
              color="success"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SupplierEdit;
