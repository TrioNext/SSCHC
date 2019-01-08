
import Model from '../../model/model';
import { REGIONS } from '../../model/model-mode';

export default function(){

  const Regions = new Model(REGIONS);
  Regions.set('paginate',{
    offset:0,
    p:0,
    max:'all',
    sort_by:'name',
    sort_type:'asc'
  });

  Regions.load();
  
}
