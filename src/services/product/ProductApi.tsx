import { logInfo } from '../../generals/utils/Logger';
import { ApiRequest, ApiResponse, BaseService } from '../base/BaseService';
import { ProductModel } from './ProductModel';

export const productApi = {
    getProducts: async (): Promise<ApiResponse<ProductModel[]>> => {
        return await ProductService.instance.getProducts();
    },

    post: () => { },

    delete: () => { },
};

class ProductService extends BaseService {
    private readonly productUrl = '/api/products';

    public static readonly instance: ProductService = new ProductService()

    public async getProducts(): Promise<ApiResponse<ProductModel[]>> {

        let request: ApiRequest = {
            url: this.productUrl,
            method: 'GET'
        };

        return this.fetchData<ProductModel[]>(request);
    }

}
