import {RawUserEntity} from "../user/types";

export type RawHydrateCommandEntity = {
    commandes: RawCommandEntity,
    adresse_livraison: RawDeliveryAddressEntity,
    modes_livraison: RawDeliveryModeEntity,
    utilisateurs: RawUserEntity,
    reduction: RawReductionEntity
    pays: RawCountryEntity
};

export type RawCommandEntity = {
    id: number,
    addr_livr_id: number,
    mode_livr_id: number,
    reduc_id: number | null | undefined,
    date_com: Date,
    total_commande: number,
    statut: string
};

export type RawCountryEntity = {
    id: number,
    nom_pays: string
}

export type RawHydrateDeliveryAddressEntity = {
    adresse_livraison: RawDeliveryAddressEntity,
    utilisateurs: RawUserEntity,
    pays: RawCountryEntity
}

export type RawDeliveryAddressEntity = {
    id: number,
    utilisateur_id: number,
    pays_id: number,
    ville_livr: string,
    adresse_livraison: string,
    code_postal_livraison: string
};

export type RawDeliveryModeEntity = {
    id: number,
    nom_mode: string,
    libelle_liv: string,
    delay_moy_liv: number
};

export type RawReductionEntity = {
    id: number,
    nom_reduc: string,
    montant_reduc: number,
    date_debut: Date,
    date_fin: Date,
    qte_reduction: number,
    statut_reduc: string
};

export type RawHydrateEffectiveReductionEntity = {
    reduc_passee: RawEffectiveReductionEntity,
    reduction: RawReductionEntity
};

export type RawEffectiveReductionEntity = {
    id: number,
    reduc_id: number
};

export type RawHydrateReductionByUserEntity = {
    utilisateurs: RawUserEntity,
    reduc_passee: RawEffectiveReductionEntity,
    reduction: RawReductionEntity
};

export type RawReductionByUserEntity = {
    reduc_passee_id: number,
    utilisateurs_id: number
}
