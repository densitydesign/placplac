import axios, { AxiosRequestConfig } from "axios";
import { stringify } from "querystring";
import { Identifier, DataProvider, CreateParams, CreateResult } from "ra-core";
import {
  FilterPayload,
  GetOneParams,
  PaginationPayload,
  SortPayload,
  Record,
  GetOneResult,
} from "react-admin";
import { getAccessToken, getRefreshToken, getUser } from "./authProvider";
import { url } from "./constants";

export const getPaginationQuery = (pagination: PaginationPayload) => {
  return {
    page: pagination.page,
    page_size: pagination.perPage,
  };
};

export const getFilterQuery = (filter: FilterPayload) => {
  const { q: search, ...otherSearchParams } = filter;
  return {
    ...otherSearchParams,
    search,
  };
};

export const getOrderingQuery = (sort: SortPayload) => {
  const { field, order } = sort;
  return {
    ordering: `${order === "ASC" ? "" : "-"}${field}`,
  };
};
const app = axios.create();
app.interceptors.request.use(
  async (config) => {
    const token = getAccessToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
app.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(originalRequest.url);
    if (
      error.response.status === 401 &&
      originalRequest.url === `${url}/token/refresh/`
    ) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return app({
        url: `${url}/token/refresh/`,
        method: "POST",
        data: {
          refresh: getRefreshToken(),
        },
      }).then((res: any) => {
        if (res.status === 200) {
          const user = getUser();
          user.access = res.data.access;
          localStorage.setItem("user", JSON.stringify(user));
          return app(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);
export const endpoint = url;
export async function clientNoJson(
  endpoint: string,
  config: AxiosRequestConfig
) {
  return app({
    ...config,
    url: endpoint,
  });
}

export async function client(resource: string, config: AxiosRequestConfig) {
  return app({
    ...config,
    url: `${endpoint}/${resource}/`,
  }).then(async (response) => {
    return await response.data;
  });
}

const dataprovider = (
  apiUrl: String
): DataProvider & {
  createMultipart: <RecordType extends Record = Record>(
    resource: string,
    params: CreateParams
  ) => Promise<CreateResult<RecordType>>;
  getFull: <RecordType extends Record = Record>(
    resource: string,
    params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;
} => {
  const getOneJson = (resource: String, id: Identifier) =>
    app(`${apiUrl}/${resource}/${id}/`).then((response) => response.data);

  return {
    getList: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { data } = (await app(url)) as any;
      const { results, count, ...rest } = data;
      return {
        data: results,
        total: count,
        rest: rest,
      };
    },

    getOne: async (resource, params) => {
      const data = await getOneJson(resource, params.id);
      return {
        data,
      };
    },
    getFull: async (resource, params) => {
      const data = await app(
        `${apiUrl}/${resource}/${params.id}/get_full/`
      ).then((response) => response.data);
      return {
        data,
      };
    },

    getMany: (resource, params) => {
      return Promise.all(params.ids.map((id) => getOneJson(resource, id)))
        .then((data) => {
          return { data };
        })
        .catch(() => ({ data: [] }));
    },

    getManyReference: async (resource, params) => {
      const query = {
        ...getFilterQuery(params.filter),
        ...getPaginationQuery(params.pagination),
        ...getOrderingQuery(params.sort),
        [params.target]: params.id,
      };
      const url = `${apiUrl}/${resource}/?${stringify(query)}`;

      const { data } = (await app(url)) as any;
      return {
        data: data.results,
        total: data.count,
      };
    },

    update: async (resource, params) => {
      console.log(params);
      const { data } = await app(`${apiUrl}/${resource}/${params.id}/`, {
        method: "PATCH",
        data: params.data,
      });
      return { data };
    },

    updateMany: (resource, params) =>
      Promise.all(
        params.ids.map((id) =>
          app(`${apiUrl}/${resource}/${id}/`, {
            method: "PATCH",
            data: JSON.stringify(params.data),
          })
        )
      ).then((responses: any) => ({
        data: responses.map(({ data }: any) => data.id),
      })),

    create: async (resource, params) => {
      return app(`${apiUrl}/${resource}/`, {
        method: "POST",
        data: params.data,
      }).then(({ data }: any) => ({
        data: { ...data },
      }));
    },
    createMultipart: async (resource, params) => {
      const formData = new FormData();
      Object.keys(params.data).forEach((key) => {
        if (key === "file") {
          formData.append("file", params.data[key].rawFile);
        } else {
          formData.append(key, params.data[key]);
        }
      });

      return app(`${apiUrl}/${resource}/`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(({ data }: any) => ({
        data: { ...data },
      }));
    },

    delete: (resource, params) =>
      app(`${apiUrl}/${resource}/${params.id}/`, {
        method: "DELETE",
      }).then(() => ({ data: params.previousData as any })),

    deleteMany: (resource, params) =>
      app(`${apiUrl}/${resource}/bulk_delete/`, {
        method: "POST",
        data: { ids: params.ids },
      }).then(() => ({ data: params.ids })),
  };
};
export default dataprovider;
